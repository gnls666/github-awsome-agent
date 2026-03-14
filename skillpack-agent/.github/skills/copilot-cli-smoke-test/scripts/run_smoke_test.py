#!/usr/bin/env python3

from __future__ import annotations

import argparse
import datetime as dt
import json
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[5]


def build_prompts(scenario: str) -> list[tuple[str, str]]:
    prompts = [
        (
            "routing",
            (
                "Read the current workspace only. Do not modify any files. "
                "Answer with exactly four bullet points in English: "
                "`workspaceMode`, `repositoryRoot`, `targetProjectRoot`, and "
                "`nextPath`. `nextPath` must be one of generate, maintain, "
                "refactor, or migrate, with one short reason."
            ),
        ),
        (
            "layers",
            (
                "Read the current workspace only. Do not modify any files. "
                "Answer with exactly three bullet points in English: "
                "`.github role`, `AGENTS.md role`, and `plans role`. "
                "State clearly whether `AGENTS.md` belongs to the target project "
                "or to the portable capability package."
            ),
        ),
    ]

    if scenario == "portable-multi":
        prompts.append(
            (
                "project-root",
                (
                    "Read the current workspace only. Do not modify any files. "
                    "Answer in two bullet points: "
                    "`isRepoRootAlwaysTarget: yes|no` and "
                    "`targetProjectRootReason: ...`"
                ),
            )
        )

    return prompts


def expected_checks(scenario: str) -> dict[str, list[str]]:
    checks = {
        "portable-empty": [
            "empty",
            "generate",
            "target project",
            "task memory",
        ],
        "portable-existing": [
            "single",
            "maintain",
            "project manual",
        ],
        "portable-multi": [
            "multi",
            "no",
            "targetprojectroot",
        ],
        "custom": [],
    }
    return {"keywords": checks.get(scenario, [])}


def normalize(text: str) -> str:
    return re.sub(r"[^a-z0-9]+", "", text.lower())


def run_copilot_prompt(
    workspace: Path,
    prompt: str,
    share_path: Path,
    agent: str,
) -> str:
    cmd = [
        "copilot",
        "--agent",
        agent,
        "-p",
        prompt,
        "--allow-all-tools",
        "--no-ask-user",
        "--silent",
        "--share",
        str(share_path),
    ]
    proc = subprocess.run(
        cmd,
        cwd=workspace,
        capture_output=True,
        text=True,
        check=False,
    )
    if proc.returncode != 0:
        raise RuntimeError(
            f"copilot command failed ({proc.returncode})\nSTDOUT:\n{proc.stdout}\nSTDERR:\n{proc.stderr}"
        )
    return proc.stdout.strip()


def ensure_tooling() -> None:
    for cmd in ("gh", "copilot"):
        if shutil.which(cmd) is None:
            raise RuntimeError(f"Required command not found in PATH: {cmd}")


def bootstrap_portable_empty_workspace(portable_source: Path) -> Path:
    if not portable_source.exists():
        raise RuntimeError(f"Portable source does not exist: {portable_source}")

    github_dir = portable_source / ".github"
    if not github_dir.exists():
        raise RuntimeError(f"Portable source does not contain .github: {portable_source}")

    temp_root = Path(tempfile.mkdtemp(prefix="portable-empty-smoke-"))
    shutil.copytree(github_dir, temp_root / ".github")
    return temp_root


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--workspace", help="Target workspace to test")
    parser.add_argument(
        "--scenario",
        default="custom",
        choices=["portable-empty", "portable-existing", "portable-multi", "custom"],
    )
    parser.add_argument("--agent", default="ux-standard")
    parser.add_argument("--output-dir", help="Directory for shared transcripts and summary")
    parser.add_argument(
        "--portable-source",
        help="Portable agent workspace to copy from when bootstrapping an empty smoke-test workspace",
    )
    args = parser.parse_args()

    ensure_tooling()

    portable_source = (
        Path(args.portable_source).resolve()
        if args.portable_source
        else REPO_ROOT / "portable-agent"
    )

    if args.workspace:
        workspace = Path(args.workspace).resolve()
        if not workspace.exists():
            raise RuntimeError(f"Workspace does not exist: {workspace}")
    elif args.scenario == "portable-empty":
        workspace = bootstrap_portable_empty_workspace(portable_source)
    else:
        raise RuntimeError("--workspace is required for this scenario")

    stamp = dt.datetime.now().strftime("%Y%m%d-%H%M%S")
    if args.output_dir:
        output_dir = Path(args.output_dir).resolve()
        output_dir.mkdir(parents=True, exist_ok=True)
    else:
        output_dir = Path(tempfile.mkdtemp(prefix=f"copilot-cli-smoke-{stamp}-"))

    prompts = build_prompts(args.scenario)
    outputs: dict[str, str] = {}
    transcript_paths: dict[str, str] = {}

    for name, prompt in prompts:
        share_path = output_dir / f"{name}.md"
        outputs[name] = run_copilot_prompt(workspace, prompt, share_path, args.agent)
        transcript_paths[name] = str(share_path)

    summary = {
        "workspace": str(workspace),
        "scenario": args.scenario,
        "agent": args.agent,
        "outputDir": str(output_dir),
        "outputs": outputs,
        "transcripts": transcript_paths,
        "checks": [],
    }

    failures: list[str] = []
    for keyword in expected_checks(args.scenario)["keywords"]:
        haystack = normalize("\n".join(outputs.values()))
        passed = keyword in haystack
        summary["checks"].append({"keyword": keyword, "passed": passed})
        if not passed:
            failures.append(keyword)

    summary_path = output_dir / "summary.json"
    summary_path.write_text(json.dumps(summary, indent=2), encoding="utf-8")

    print(f"workspace: {workspace}")
    print(f"scenario: {args.scenario}")
    print(f"output_dir: {output_dir}")
    print(f"summary: {summary_path}")
    for name, value in outputs.items():
        print(f"\n== {name} ==\n{value}")

    if failures:
        print("\nstatus: FAIL")
        print("missing_keywords:", ", ".join(failures))
        return 1

    print("\nstatus: PASS")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:  # pragma: no cover
        print(f"error: {exc}", file=sys.stderr)
        raise SystemExit(2)

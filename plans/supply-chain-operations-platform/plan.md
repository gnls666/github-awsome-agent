# Plan

## Goal
交付一个“集团供应链运营中台”多页面后台系统，覆盖采购、供应商、库存、仓库、订单、履约、财务、分析、审计、组织权限与设置等核心业务模块。

## Decisions
- 使用 `multi-page` 作为基础模板，先建立完整后台信息架构，再做后续业务化定制。
- 项目目录名采用 `supply-chain-operations-platform`，并与 `plans/` 下的计划和规格目录保持一致。
- 界面语言使用中文，页面与模块命名保持业务导向，代码标识采用英文。
- 复杂需求优先通过 `postGeneration.tasks` 记录，避免把所有业务细节硬塞进模板基础参数。

## Assumptions
- 当前阶段以高质量 mock 数据和后台结构搭建为主，不接真实后端。
- 经营分析页允许先使用占位图表区域和静态分析卡片。
- 权限控制、全局筛选、统一状态反馈等能力属于生成后的系统级增强项。

## Scope
- Dashboard
- PurchaseManagement
- SupplierManagement
- InventoryManagement
- WarehouseManagement
- OrderManagement
- FulfillmentCenter
- FinanceCenter
- BusinessAnalysis
- AuditCenter
- OrganizationPermissions
- SystemSettings

## Post-Generation Focus
- 权限控制逻辑
- 图表与分析组件
- 全局搜索与筛选
- 统一分页
- 加载、空状态、错误状态
- UI 一致性优化

## Verification Plan
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`

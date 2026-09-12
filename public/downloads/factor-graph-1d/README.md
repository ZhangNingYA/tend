# 一维因子图项目

这是因子图入门第 8 篇的最小可运行实现。它只使用 Python 标准库，不需要安装 NumPy。

## 运行

需要 Python 3.10 或更新版本：

```bash
python factor_graph.py
python -m unittest -v
```

程序会依次显示默认估计、加入回环后的估计，以及删除绝对约束后暴露的 gauge 自由度。输出中的 `whitened residuals` 是每条因子除以标准差后的残差，`cost` 是它们平方和的一半。

## 代码对应的图

状态是 `x = [x0, x1, x2]`。每个 `Factor` 保存一行局部线性关系 `row @ x ≈ value` 和标准差：

- `prior`: `x0 ≈ 0 ± 1`
- `motion 1`: `x1 - x0 ≈ 1 ± 0.5`
- `motion 2`: `x2 - x1 ≈ 1 ± 0.5`
- `end observation`: `x2 ≈ 2.4 ± 0.5`
- `loop`（可选）: `x2 - x0 ≈ 2 ± 0.2`

`estimate()` 将每个因子累加为 `H = JᵀΩJ` 与 `b = JᵀΩz`，再解 `Hx = b`。这里的 3×3 消元器只为展示过程；真实项目应使用经过测试的 QR/Cholesky 和稀疏矩阵库。

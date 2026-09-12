"""A dependency-free one-dimensional factor-graph least-squares example.

Each factor is a whitened linear residual row @ state - value, with a known
standard deviation. The normal equations are assembled from all local factors.
This is teaching code: production systems should use a tested QR/Cholesky
solver and sparse matrices.
"""
from dataclasses import dataclass
from math import isclose


@dataclass(frozen=True)
class Factor:
    name: str
    row: tuple[float, float, float]
    value: float
    sigma: float

    def __post_init__(self):
        if self.sigma <= 0:
            raise ValueError("sigma must be positive")


def solve_linear(matrix: list[list[float]], vector: list[float]) -> list[float]:
    """Solve a small dense system with partial pivoting for teaching purposes."""
    n = len(vector)
    a = [row[:] + [vector[i]] for i, row in enumerate(matrix)]
    for k in range(n):
        pivot = max(range(k, n), key=lambda i: abs(a[i][k]))
        if abs(a[pivot][k]) < 1e-12:
            raise ValueError("constraints do not fix every degree of freedom")
        a[k], a[pivot] = a[pivot], a[k]
        for i in range(k + 1, n):
            ratio = a[i][k] / a[k][k]
            for j in range(k, n + 1):
                a[i][j] -= ratio * a[k][j]
    result = [0.0] * n
    for i in range(n - 1, -1, -1):
        result[i] = (a[i][n] - sum(a[i][j] * result[j] for j in range(i + 1, n))) / a[i][i]
    return result


def make_factors(observation=2.4, sigma=0.5, loop=False, absolute=True):
    factors = [
        Factor("motion 1", (-1, 1, 0), 1, 0.5),
        Factor("motion 2", (0, -1, 1), 1, 0.5),
    ]
    if absolute:
        factors = [Factor("prior", (1, 0, 0), 0, 1), *factors]
        factors.append(Factor("end observation", (0, 0, 1), observation, sigma))
    if loop:
        factors.append(Factor("loop", (-1, 0, 1), 2, 0.2))
    return factors


def estimate(observation=2.4, sigma=0.5, loop=False, absolute=True):
    factors = make_factors(observation, sigma, loop, absolute)
    information = [[0.0] * 3 for _ in range(3)]
    rhs = [0.0] * 3
    for factor in factors:
        weight = 1 / factor.sigma**2
        for i, a_i in enumerate(factor.row):
            rhs[i] += a_i * factor.value * weight
            for j, a_j in enumerate(factor.row):
                information[i][j] += a_i * a_j * weight
    state = solve_linear(information, rhs)
    residuals = {
        factor.name: (sum(a * x for a, x in zip(factor.row, state)) - factor.value) / factor.sigma
        for factor in factors
    }
    cost = 0.5 * sum(value**2 for value in residuals.values())
    return state, residuals, cost


def print_case(label, **options):
    print(f"\n{label}")
    try:
        state, residuals, cost = estimate(**options)
    except ValueError as error:
        print(f"  解失败：{error}")
        return
    print("  state = [" + ", ".join(f"{x:.6f}" for x in state) + "] m")
    print("  whitened residuals = " + ", ".join(f"{k}: {v:.6f}" for k, v in residuals.items()))
    print(f"  cost = {cost:.6f}")


if __name__ == "__main__":
    print_case("默认：绝对先验 + 末端观测")
    print_case("加入回环", loop=True)
    print_case("只保留相对运动：应当暴露 gauge", absolute=False)

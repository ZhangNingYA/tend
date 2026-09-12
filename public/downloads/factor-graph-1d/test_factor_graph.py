import unittest
from factor_graph import estimate


class FactorGraphTest(unittest.TestCase):
    def test_default_solution_matches_hand_calculation(self):
        state, residuals, cost = estimate()
        self.assertTrue(all(abs(a - b) < 1e-10 for a, b in zip(state, [0.228571428571429, 1.2857142857142863, 2.3428571428571434])))
        self.assertAlmostEqual(cost, 0.04571428571428567)

    def test_missing_absolute_constraint_is_singular(self):
        with self.assertRaises(ValueError):
            estimate(absolute=False)


if __name__ == "__main__":
    unittest.main()

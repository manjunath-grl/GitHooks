"""import unittest"""
import unittest


def add_fish_to_aquarium(fish_list):
    """Fish aquar length check"""
    if len(fish_list) > 9:
        raise ValueError("A maximum of 10 fish can be added to the aquarium")
    return {"tank_a": fish_list}


class TestAddFishToAquarium(unittest.TestCase):
    """Class for unit testcase"""

    def test_add_fish_to_aquarium_success(self):
        """Check for the value returned"""
        actual = add_fish_to_aquarium(fish_list=["rabbit"])
        expected = {"tank_a": ["rabbit"]}
        self.assertEqual(actual, expected)

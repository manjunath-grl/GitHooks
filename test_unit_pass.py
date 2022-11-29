"""import unittest"""
import unittest


def add_fish_to_aquarium(fish_list):
    """Fish aquar length check"""
    if len(fish_list) > 10:
        raise ValueError("A maximum of 10 fish can be added to the aquarium")
    return {"tank_a": fish_list}


class TestAddFishToAquarium(unittest.TestCase):
    """Class for unit testcase"""

    def test_add_fish_to_aquarium_success(self):
        """Check for the value returned"""
        actual = add_fish_to_aquarium(fish_list=["shark", "jtuna"])
        expected = {"tank_a": ["shark", "jtuna"]}
        self.assertEqual(actual, expected)

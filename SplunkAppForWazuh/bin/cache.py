# -*- coding: utf-8 -*-
#
# A simple memory cache library
# Author: Craig Russell <craig@craig-russell.co.uk>
#

import time


class cache(object):

    _cache_ = {}
    VALUE = 0
    EXPIRES = 1

    @classmethod
    def get(cls, key):
        """Get the value from the cache stored with 'key' if it exists"""
        try:
            if cls._cache_[key][cls.EXPIRES] > time.time():
                return cls._cache_[key][cls.VALUE]
            else:
                del cls._cache_[key]  # Delete the item if it has expired
                return None
        except KeyError:
            return None

    @classmethod
    def delete(cls, key):
        """Delete the given 'key' and its value'"""
        try:
            del cls._cache_[key]  # Delete the item
        except KeyError:
            pass

    @classmethod
    def set(cls, key, value, duration=3600):
        """Store/overwite a value in the cache with 'key' and an optional duration (seconds)"""
        try:
            expires = time.time() + duration
        except TypeError:
            raise TypeError("Duration must be numeric")

        cls._cache_[key] = (value, expires)
        return cls.get(key)

    @classmethod
    def clean(cls):
        """Remove all expired items from the cache"""
        for key in cls._cache_.keys():
            cls.get(key)  # Attempting to fetch an expired item deletes it

    @classmethod
    def purge(cls):
        """Remove all items from the cache"""
        cls._cache_ = {}


if __name__ == "__main__":

    import unittest

    class TestCache(unittest.TestCase):

        def test_set(self):
            # Set value
            Cache.set('a', 'A')
            self.assertIn('a', Cache._cache_.keys())
            self.assertEqual('A', Cache._cache_.get('a')[0])

            # Update value
            Cache.set('a', 'B')
            self.assertIn('a', Cache._cache_.keys())
            self.assertEqual('B', Cache._cache_.get('a')[0])

            # Set with duration
            Cache.set(key='a', value='A', duration=60)
            self.assertIn('a', Cache._cache_.keys())
            self.assertEqual('A', Cache._cache_.get('a')[0])

            # Set with bad duration
            with self.assertRaises(TypeError):
                Cache.set(key='a', value='A', duration='x')

        def test_get(self):
            # Set & get
            Cache.set('a', 'A')
            self.assertEqual('A', Cache.get('a'))

            # Set with duration
            Cache.set(key='a', value='A', duration=60)
            self.assertEqual('A', Cache.get('a'))

            # Set with expired duration
            Cache.set(key='b', value='B', duration=-60)
            self.assertNotIn('b', Cache._cache_.keys())
            self.assertIsNone(Cache.get('b'))

        def test_clean(self):
            # Set some data
            Cache.set(key='a', value='A', duration=1)
            Cache.set(key='b', value='B', duration=60)
            Cache.set(key='c', value='C', duration=1)
            Cache.set(key='d', value='D', duration=60)

            # Check it's all stored
            self.assertIn('a', Cache._cache_.keys())
            self.assertIn('b', Cache._cache_.keys())
            self.assertIn('c', Cache._cache_.keys())
            self.assertIn('d', Cache._cache_.keys())

            # Wait for expiry then clean the cache
            time.sleep(2)
            Cache.clean()

            # Only unexpired data still present
            self.assertNotIn('a', Cache._cache_.keys())
            self.assertIn('b', Cache._cache_.keys())
            self.assertNotIn('c', Cache._cache_.keys())
            self.assertIn('d', Cache._cache_.keys())

        def test_purge(self):
            # Set some data
            Cache.set(key='a', value='A')
            Cache.set(key='b', value='B')
            Cache.set(key='c', value='C')
            Cache.set(key='d', value='D')

            # Check it's all stored
            self.assertIn('a', Cache._cache_.keys())
            self.assertIn('b', Cache._cache_.keys())
            self.assertIn('c', Cache._cache_.keys())
            self.assertIn('d', Cache._cache_.keys())

            Cache.purge()

            # Check cache is empty
            self.assertEqual({}, Cache._cache_)

    unittest.main(verbosity=2)

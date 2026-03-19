import mongoose from "mongoose";
import dotenv from "dotenv";
import Question from "./models/Question.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);
console.log("MongoDB Connected ");

// 30 Unique Questions - 10 Easy, 10 Medium, 10 Hard
const baseQuestions = [
  // EASY QUESTIONS (10)
  {
    title: "Two Sum",
    statement: "Given an array of integers nums and an integer target, return the indices of the two numbers that add up to the target. You may assume each input has exactly one solution, and you cannot use the same element twice.",
    example: "Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: nums[0] + nums[1] = 2 + 7 = 9",
    difficulty: "Easy",
    topic: "Array"
  },
  {
    title: "Contains Duplicate",
    statement: "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",
    example: "Input: nums = [1,2,3,1]\nOutput: true\n\nInput: nums = [1,2,3,4]\nOutput: false",
    difficulty: "Easy",
    topic: "Array"
  },
  {
    title: "Valid Parentheses",
    statement: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: (1) Open brackets must be closed by the same type of brackets. (2) Open brackets must be closed in the correct order.",
    example: "Input: s = \"()\"\nOutput: true\n\nInput: s = \"(]\"\nOutput: false",
    difficulty: "Easy",
    topic: "Stack"
  },
  {
    title: "Maximum Subarray",
    statement: "Given an integer array nums, find the subarray with the largest sum, and return its sum. A subarray is a contiguous non-empty sequence of elements within an array.",
    example: "Input: nums = [-2,1,-3,4,-1,2,1,-5,4]\nOutput: 6\nExplanation: [4,-1,2,1] has the largest sum = 6",
    difficulty: "Easy",
    topic: "Array"
  },
  {
    title: "Best Time to Buy and Sell Stock",
    statement: "You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and a different day in the future to sell that stock. Return the maximum profit. If no profit can be achieved, return 0.",
    example: "Input: prices = [7,1,5,3,6,4]\nOutput: 5\nExplanation: Buy at 1 and sell at 6, profit = 5",
    difficulty: "Easy",
    topic: "Array"
  },
  {
    title: "Merge Two Sorted Lists",
    statement: "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the two lists. Return the head of the merged linked list.",
    example: "Input: list1 = [1,2,4], list2 = [1,3,4]\nOutput: [1,1,2,3,4,4]",
    difficulty: "Easy",
    topic: "LinkedList"
  },
  {
    title: "Reverse String",
    statement: "Write a function that reverses a string. The input string is given as an array of characters s. You must do this by modifying the input array in-place with O(1) extra memory.",
    example: "Input: s = [\"h\",\"e\",\"l\",\"l\",\"o\"]\nOutput: [\"o\",\"l\",\"l\",\"e\",\"h\"]",
    difficulty: "Easy",
    topic: "String"
  },
  {
    title: "Fibonacci Number",
    statement: "The Fibonacci numbers, commonly denoted F(n) form a sequence called the Fibonacci sequence, in which each number is the sum of the two preceding ones. Given n, calculate F(n).",
    example: "Input: n = 2\nOutput: 1\n\nInput: n = 3\nOutput: 2",
    difficulty: "Easy",
    topic: "DP"
  },
  {
    title: "Majority Element",
    statement: "Given an array nums of size n, return the majority element. The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume the majority element always exists in the array.",
    example: "Input: nums = [3,2,3]\nOutput: 3\n\nInput: nums = [2,2,1,1,1,2,2]\nOutput: 2",
    difficulty: "Easy",
    topic: "Array"
  },
  {
    title: "Valid Anagram",
    statement: "Given two strings s and t, return true if t is an anagram of s, and false otherwise. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
    example: "Input: s = \"anagram\", t = \"nagaram\"\nOutput: true\n\nInput: s = \"rat\", t = \"car\"\nOutput: false",
    difficulty: "Easy",
    topic: "String"
  },

  // MEDIUM QUESTIONS (10)
  {
    title: "3Sum",
    statement: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0. The solution set must not contain duplicate triplets.",
    example: "Input: nums = [-1,0,1,2,-1,-4]\nOutput: [[-1,-1,2],[-1,0,1]]",
    difficulty: "Medium",
    topic: "Array"
  },
  {
    title: "Longest Substring Without Repeating Characters",
    statement: "Given a string s, find the length of the longest substring without repeating characters.",
    example: "Input: s = \"abcabcbb\"\nOutput: 3\nExplanation: The answer is \"abc\", with length 3",
    difficulty: "Medium",
    topic: "SlidingWindow"
  },
  {
    title: "Container With Most Water",
    statement: "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container contains the most water.",
    example: "Input: height = [1,8,6,2,5,4,8,3,7]\nOutput: 49",
    difficulty: "Medium",
    topic: "Array"
  },
  {
    title: "Number of Islands",
    statement: "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.",
    example: "Input: grid = [[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"1\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"1\",\"1\"]]\nOutput: 3",
    difficulty: "Medium",
    topic: "Graph"
  },
  {
    title: "Kth Largest Element in an Array",
    statement: "Given an integer array nums and an integer k, return the kth largest element in the array. Note that it is the kth largest element in the sorted order, not the kth distinct element.",
    example: "Input: nums = [3,2,1,5,6,4], k = 2\nOutput: 5",
    difficulty: "Medium",
    topic: "Heap"
  },
  {
    title: "Coin Change",
    statement: "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.",
    example: "Input: coins = [1,2,5], amount = 5\nOutput: 1",
    difficulty: "Medium",
    topic: "DP"
  },
  {
    title: "LRU Cache",
    statement: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement the LRUCache class with get(key) and put(key, value) functions. Both must run in O(1) average time complexity.",
    example: "LRUCache lRUCache = new LRUCache(2);\nlRUCache.put(1, 1);\nlRUCache.put(2, 2);\nlRUCache.get(1); // returns 1",
    difficulty: "Medium",
    topic: "Design"
  },
  {
    title: "Rotate Image",
    statement: "You are given an n × n 2D matrix representing an image, rotate the image by 90 degrees (clockwise). You have to rotate the image in-place, which means you have to modify the input 2D matrix directly.",
    example: "Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]\nOutput: [[7,4,1],[8,5,2],[9,6,3]]",
    difficulty: "Medium",
    topic: "Array"
  },
  {
    title: "Word Ladder",
    statement: "Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.",
    example: "Input: beginWord = \"hit\", endWord = \"cog\", wordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]\nOutput: 5",
    difficulty: "Medium",
    topic: "Graph"
  },
  {
    title: "Decode Ways",
    statement: "A message containing letters from A-Z can be encoded into numbers using the following mapping: 'A' -> 1, 'B' -> 2, ..., 'Z' -> 26. Given a string s containing only digits, return the number of ways to decode it.",
    example: "Input: s = \"12\"\nOutput: 2",
    difficulty: "Medium",
    topic: "DP"
  },

  // HARD QUESTIONS (10)
  {
    title: "Median of Two Sorted Arrays",
    statement: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).",
    example: "Input: nums1 = [1,3], nums2 = [2]\nOutput: 2.00000",
    difficulty: "Hard",
    topic: "BinarySearch"
  },
  {
    title: "Trapping Rain Water",
    statement: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    example: "Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]\nOutput: 6",
    difficulty: "Hard",
    topic: "Stack"
  },
  {
    title: "Word Ladder II",
    statement: "Given two words, beginWord and endWord, and a dictionary wordList, return all the shortest transformation sequences from beginWord to endWord, or an empty list if no such sequence exists.",
    example: "Input: beginWord = \"hit\", endWord = \"cog\", wordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]\nOutput: [[\"hit\",\"hot\",\"dot\",\"dog\",\"cog\"],[\"hit\",\"hot\",\"lot\",\"log\",\"cog\"]]",
    difficulty: "Hard",
    topic: "Backtracking"
  },
  {
    title: "Serialize and Deserialize Binary Tree",
    statement: "Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer. Design an algorithm to serialize and deserialize a binary tree.",
    example: "Input: root = [1,2,3,null,null,4,5]\nOutput: [1,2,3,null,null,4,5]",
    difficulty: "Hard",
    topic: "Tree"
  },
  {
    title: "Minimum Window Substring",
    statement: "Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t is included in this window. If there is no such window, return the empty string.",
    example: "Input: s = \"ADOBECODEBANC\", t = \"ABC\"\nOutput: \"BANC\"",
    difficulty: "Hard",
    topic: "SlidingWindow"
  },
  {
    title: "Regular Expression Matching",
    statement: "Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where '.' matches any single character and '*' matches zero or more of the preceding element.",
    example: "Input: s = \"aa\", p = \"a\"\nOutput: false",
    difficulty: "Hard",
    topic: "DP"
  },
  {
    title: "Max Points on a Line",
    statement: "Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane, return the maximum number of points that lie on the same straight line.",
    example: "Input: points = [[1,1],[1,1],[2,2],[2,2]]\nOutput: 4",
    difficulty: "Hard",
    topic: "Math"
  },
  {
    title: "Distinct Subsequences",
    statement: "Given two strings s and t, return the number of distinct subsequences of s which equals t. A string's subsequence is a new string formed from the original string by deleting some (not necessarily consecutive) characters without changing the remaining characters' relative order.",
    example: "Input: s = \"rabbbit\", t = \"rabbit\"\nOutput: 3",
    difficulty: "Hard",
    topic: "DP"
  },
  {
    title: "Wildcard Matching",
    statement: "Given an input string s and a pattern p, implement wildcard pattern matching with support for '?' and '*' where '?' matches any single character and '*' matches any sequence of characters (including the empty sequence).",
    example: "Input: s = \"aa\", p = \"a\"\nOutput: false",
    difficulty: "Hard",
    topic: "DP"
  },
  {
    title: "Word Search II",
    statement: "Given an m x n board of characters and a list of strings words, return all words on the board. Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring.",
    example: "Input: board = [[\"o\",\"a\",\"a\"],[\"n\",\"t\",\"a\"],[\"b\",\"a\",\"t\"]], words = [\"oath\",\"pea\",\"eat\",\"rain\"]\nOutput: [\"eat\",\"oath\"]",
    difficulty: "Hard",
    topic: "Backtracking"
  }
];

// Generate 240 questions: 30 base questions × 8 companies
const companies = ["Facebook", "Amazon", "Apple", "Netflix", "Google", "Microsoft", "Meta", "Flipkart"];
const allQuestions = [];

companies.forEach(company => {
  baseQuestions.forEach(question => {
    allQuestions.push({
      title: question.title,
      statement: question.statement,
      example: question.example,
      difficulty: question.difficulty,
      topic: question.topic,
      company: company
    });
  });
});

try {
  await Question.deleteMany();
  console.log("Old questions removed");

  await Question.insertMany(allQuestions);

  console.log(` ${allQuestions.length} Questions Added Successfully (30 per company × 8 companies)`);
  process.exit();
} catch (err) {
  console.error(err);
  process.exit(1);
}

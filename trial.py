# s = "programming"

# x = {}

# for char in s:
#     if char in x:
#         x[char] += 1
#     else:
#         x[char] = 1


# print(x)


# n = 10

# a = 0
# b = 1

# for i in range(n):
#     print(a, end=" ")

#     a,b = b, a + b

# nums = [1, 2, 3, 2, 4, 1, 5]

# result = []

# for num in nums:
#     if num not in result:
#         result.append(num)
# print(result)


# s = "python"

# rev = s[::-1]
# print(rev)

# s = "python"

# rev = []

# for char in s:
#     rev.insert(0, char)

# print(rev)

nums = [10, 25, 5, 40, 30]

max1 = max(nums)

index = nums.index(max1)

nums.pop(index)

max2= max(nums)

print(max1, max2)
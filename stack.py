from collections import deque

# create stack
stack = deque()

# push elements
stack.append(10)
stack.append(20)
stack.append(30)

print("Stack:", stack)

# pop element
stack.pop()

print("After pop:", stack)

# peek top element
print("Top element:", stack[-1])
# Author: Iona Tramelli
# Date: 2/16/24

from sys import stdin
import math

def main():
    try:
        while True:
            parameters = input()
            parameters = parameters.split(' ')
            r = float(parameters[0])
            x = math.sqrt(float(parameters[1])**2 + float(parameters[2])**2)
            if x >= r - 0.001:
                print("miss")
            else:
                y = 0
                b = math.sqrt(r**2 - x**2)
                theta = math.atan(b/x)
                smallHalf = (theta * r**2) - (b * x)
                largeHalf = (math.pi * r**2) - (smallHalf)
                print(str(largeHalf) + " " + str(smallHalf))
    except EOFError:
        pass


main()
# Author: Iona Tramelli
# Date: 3/11/24

def main():
    firstLine = input().split()
    arrayLength = int(firstLine[0])
    action = int(firstLine[1])
    array = input().split() # Note that the numbers are strings in here

    if action == 1:
        print(7)
    elif action == 2:
        if array[0] > array[1]:
            print("Bigger")
        elif array[0] == array[1]:
            print("Equal")
        else:
            print("Smaller")
    elif action == 3:
        if array[0] > array[1]:
            if array[2] > array[1]:
                if array[0] > array[2]:
                    print(array[2])
                else:
                    print(array[0])
            else:
                print(array[1])
        elif array[1] > array[0]:
            if array[2] > array[0]:
                if array[1] > array[2]:
                    print(array[2])
                else:
                    print(array[1])
            else:
                print(array[0])
        else:
            print(array[0])
    elif action == 4:
        total = 0
        for digit in array:
            total += int(digit)
        print(total)
    elif action == 5:
        totalEven = 0
        for digit in array:
            if int(digit) % 2 == 0:
                totalEven += int(digit)
        print(totalEven)
    elif action == 6: 
        charSequence = []
        for digit in array:
            letter = chr((int(digit) % 26) + 97)
            charSequence.append(letter)
        print("".join(charSequence))
    else: # action == 7
        i = 0
        previousIValues = set()
        previousIValues.add(0)
        while i < arrayLength and i >= 0:
            i = int(array[i])
            if i in previousIValues:
                print("Cyclic")
                return
            else:
                previousIValues.add(i)
            if i == arrayLength - 1:
                print("Done")
                return
        print("Out")
            


main()
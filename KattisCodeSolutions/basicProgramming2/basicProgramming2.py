# Author: Iona Tramelli
# Date: 3/11/24


def main():
    firstLine = input().split()
    arrayLength = int(firstLine[0])
    action = int(firstLine[1])
    array = [int(num) for num in input().split()]

    if action == 1:
        arraySet = set(array)
        for number in arraySet:
            if (7777 - number) in arraySet:
                print("Yes")
                return
        print("No")
    elif action == 2:
        arraySet = set(array)
        if arrayLength == len(arraySet):
            print("Unique")
        else:
            print("Contains duplicate")
    elif action == 3:
        # Finds a number that appears > N/2 times, if it exists
        numberCount = dict()
        for number in array:
            try:
                numberCount[number] = numberCount[number] + 1
            except:
                numberCount[number] = 1
        wantedNumber = 0
        largestSeen = 0
        for key in numberCount:
            if numberCount[key] > largestSeen:
                wantedNumber = key
                largestSeen = numberCount[key]
        if numberCount[wantedNumber] > arrayLength/2:
            print(wantedNumber)
        else:
            print(-1)
    elif action == 4:
        array.sort()
        if arrayLength % 2 == 1:
            print(str(array[int((arrayLength+1)/2 - 1)]))
        else:
            print(str(array[int(arrayLength/2 - 1)]) + " " + str(array[int(arrayLength/2)]))
    else: # action == 5 
        toPrintString = []
        array.sort()
        for number in array:
            if number >= 100: 
                if number <= 999:
                    toPrintString.append(str(number))
                else: 
                    break
        print(" ".join(toPrintString))


main()
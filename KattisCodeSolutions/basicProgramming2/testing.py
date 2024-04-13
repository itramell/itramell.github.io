# Author: Iona Tramelli
# Date: 3/10/24


def filterNumbers(num):
    if int(num) < 100 or int(num) > 999:
        return False
    else:
        return True

def main():
    firstLine = input().split()
    arrayLength = int(firstLine[0])
    action = int(firstLine[1])
    array = [int(num) for num in input().split()]

    if action == 1:
        arraySet = set(array)
        for number in arraySet:
            if str(7777 - int(number)) in arraySet:
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
        arraySet = set(array)
        # Checks if there exists any number that appears more than N/2 times
        if arrayLength % 2 == 1:
            if len(arraySet) > arrayLength/2 + 1:
                print(-1)
                return
        else:
            if len(arraySet) >= arrayLength/2:
                print(-1)
                return
        # Finds a number that appears > N/2 times, if it exists
        for number in arraySet:
            if array.count(number) > arrayLength/2:
                print(number)
                return
        print(-1)
    elif action == 4: # GIVING WRONG ANSWER - but it does the right thing? How is it giving the wrong answer?
        array.sort()
        if arrayLength % 2 == 1:
            print(array[int((arrayLength+1)/2 - 1)])
        else:
            print(array[int(arrayLength/2 - 1)] + " " + array[int(arrayLength/2)])
    else: # action == 5
        toPrintString = ""
        array.sort()
        print(array)
        for number in array:
            print(number)
            if int(number) >= 100: 
                if int(number) <= 999:
                    toPrintString += number + " "
                else: 
                    break
        print(toPrintString.strip())


main()
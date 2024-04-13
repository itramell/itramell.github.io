# Author: Iona Tramelli
# Date: 3/18/24

import math

def main():
    # Set up main problem information
    firstLine = input().split()
    diskCount = int(firstLine[0])
    luckyNumberCount = int(firstLine[1])
    initialPosition = int(input())
    passcode = int(input())

    # Set up lucky numbers. Make full set, and make initial edge dictionary value 
    allLuckyNumbers = {initialPosition, passcode}
    luckyNumberEdges = dict()
    luckyNumberEdges[initialPosition] = []
    luckyNumberEdges[passcode] = []
    for i in range(0, luckyNumberCount):
        newLuckyNumber = int(input())
        allLuckyNumbers.add(newLuckyNumber)
        luckyNumberEdges[newLuckyNumber] = []

    # Find all connections between lucky numbers
    for luckyNumber in allLuckyNumbers:
        for i in range(0, diskCount): # i references the current digit we are on. 0 refers to the 1's place.
            # Gets the current digit we are on
            if i == 0:
                currentDigit = luckyNumber % 10 
            else:
                # By taking the modulo in the place of one digit greater of the digit looking for minus the previous modulo and dividing by the 
                # place the digit is in, we get the singular digit. 
                # Example: 1234 mod 100 = 34, 1234 mod 10 = 4. 34 - 4 = 30 / 10 = 3
                currentDigit = ((luckyNumber % (10**(i+1))) - (luckyNumber % (10**i))) / (10**i)
            if currentDigit == 0:
                if luckyNumber + 10**i in allLuckyNumbers:
                    luckyNumberEdges[luckyNumber].append(luckyNumber + 10**i)
                if luckyNumber + ((10**i) * 9) in allLuckyNumbers:
                    luckyNumberEdges[luckyNumber].append(luckyNumber + ((10**i) * 9)) 
            elif currentDigit == 9:
                if luckyNumber - ((10**i) * 9) in allLuckyNumbers:
                    luckyNumberEdges[luckyNumber].append(luckyNumber - ((10**i) * 9))
                if luckyNumber - 10**i in allLuckyNumbers:
                    luckyNumberEdges[luckyNumber].append(luckyNumber - 10**i)
            else: 
                if luckyNumber + 10**i in allLuckyNumbers:
                    luckyNumberEdges[luckyNumber].append(luckyNumber + 10**i)
                if luckyNumber - 10**i in allLuckyNumbers:
                    luckyNumberEdges[luckyNumber].append(luckyNumber - 10**i)
    
    # Find the minimal steps to open lock
    beenHere = set()
    pathing = dict()
    queue = []
    
    queue.append(initialPosition)
    pathing[initialPosition] = initialPosition
    beenHere.add(initialPosition)
    while queue != []:
        processing = queue.pop(0)
        for node in luckyNumberEdges[processing]:
            if node not in beenHere:
                queue.append(node)
                pathing[node] = processing
                beenHere.add(node)
                
    
    # Get the path for printing
    try:
        previousNode = pathing[passcode]
    except:
        print("Neibb")
        return
    shortestPath = []
    shortestPath.append(passcode)
    while previousNode != initialPosition:
        shortestPath.insert(0, previousNode)
        previousNode = pathing[previousNode]
    
    print(len(shortestPath))
    # Get the length of the number, leading zeros are not included in ints
    if initialPosition != 0:
        luckyNumLength = math.floor(math.log10(initialPosition)) + 1
    else:
        luckyNumLength = 1
    # Add in the leading 0's if they exist
    if luckyNumLength < diskCount:
        print("".zfill(diskCount - luckyNumLength), initialPosition, sep='')
    else:
        print(initialPosition)
    for luckyNum in shortestPath:
        if luckyNum != 0:
            luckyNumLength = math.floor(math.log10(luckyNum)) + 1
        else:
            luckyNumLength = 1
        if luckyNumLength < diskCount:
            print("".zfill(diskCount - luckyNumLength), luckyNum, sep='')
        else:
            print(luckyNum)

main()
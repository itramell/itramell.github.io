# Author: Iona Tramelli
# Date: 2/23/24

from sys import stdin

def main():
    # Get the starting information, before any days pass
    totalNumbers = int(input())
    numbersList = input().split()
    days = int(input())

    # Put unique numbers in a set. Keep track of duplicates using a dictionary. Add up all numbers while we process them to start a running total.
    # Doing the running total now decreases the amount of processing later
    uniqueNumbers = set()
    uniqueNumberQuantities = {}
    runningTotal = 0
    totalInflation = 0
    for number in numbersList:
        if not (int(number)) in uniqueNumbers:
            uniqueNumbers.add(int(number))
            uniqueNumberQuantities[int(number)] = 1
        else:
            uniqueNumberQuantities[int(number)] = uniqueNumberQuantities[int(number)] + 1
        runningTotal += int(number)

    # Process through the days. Keep a running inflation total so set numbers and dictionary pairs do not need to change except during SET days.
    for x in range(days):
        dailyTask = input().split()
        task = dailyTask[0]
        if dailyTask[0] == "INFLATION": # INFLATION day, change the running total and the 
            inflation = int(dailyTask[1]) 
            runningTotal += totalNumbers * inflation
            totalInflation += inflation
        else: # SET day, change running total and edit set and dictionary to account for the number change
            currentNumber = int(dailyTask[1]) - totalInflation # The initial value (inflation is removed because it is being calculated in the running total)
            newNumber = int(dailyTask[2]) - totalInflation # The new value the initial value will be set to
            if currentNumber in uniqueNumbers:
                runningTotal += uniqueNumberQuantities[currentNumber] * (newNumber - currentNumber) # Add the difference from the number change
                # If we already have the new number, then update the amount of the new number and remove the current number, which is an old number
                if newNumber in uniqueNumbers:
                    # Check to make sure it isn't the same number. If it is, do nothing, print the running total and move onto the next day
                    if newNumber == currentNumber:
                        print(runningTotal)
                        continue
                    uniqueNumberQuantities[newNumber] = uniqueNumberQuantities[newNumber] + uniqueNumberQuantities[currentNumber]
                    uniqueNumbers.remove(currentNumber)
                # If not, then add the new number to the unique number set and add its amount, then remove the current number, which is an old number
                else:
                    uniqueNumbers.add(newNumber)
                    uniqueNumberQuantities[newNumber] = uniqueNumberQuantities[currentNumber]
                    uniqueNumbers.remove(currentNumber)
        print(runningTotal)
    return 

main()
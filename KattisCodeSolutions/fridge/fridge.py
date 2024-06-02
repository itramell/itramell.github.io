# Author: Iona Tramelli
# Date: 4/19/24

def main():
    digits = input()
    # digitCount works by having the index number be equivalent to the digit being observed, and the value is the count of how many times the 
    # observed digit is seen.
    digitCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    uniqueDigits = set()
    allDigits = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9}
    
    for digit in digits:
        digitCount[int(digit)] += 1
        uniqueDigits.add(int(digit))
    
    notFoundDigit = allDigits.difference(uniqueDigits) # Compares the two sets to get a set with any digits not found in the input.
    if notFoundDigit != set(): # There exists a digit that was not in the input.
        # Check to see if there is only 1 digit. If not, remove 0, as 10 is > 1 through 9, and 0 is not considered as a positive number
        if len(notFoundDigit) == 1:
            smallestDigit = min(notFoundDigit)
        else:
            notFoundDigit.discard(0)
            smallestDigit = min(notFoundDigit)
        if smallestDigit == 0:
            print(10)
        else:        
            print(smallestDigit)
    else: # All digits are seen at least once in the input.
        smallestDigitCount = min(digitCount) # Get the digit repeated the least amount of times.
        leastCountSmallestDigit = digitCount.index(smallestDigitCount) # Get the smallest digit of that repeated amount.
        equalMinCounts = digitCount.count(smallestDigitCount)

        # 0 being the smallest digit with the smallest count only works if its count is less than the count of all other digits
        if equalMinCounts == 1 and leastCountSmallestDigit == 0: # There exists another count equal to 0's count, choose that other digit
            print(10, end='')
            for i in range(0, smallestDigitCount - 1):
                print(leastCountSmallestDigit, end='')
            print(leastCountSmallestDigit)
            return(1)
        
        digitCount[0] = 1000
        smallestDigitCount = min(digitCount)
        leastCountSmallestDigit = digitCount.index(smallestDigitCount)
        # Print the digit found 1 more times than its count to get the smallest positive number that cannot be made with the digits in the input.
        for i in range(0, smallestDigitCount):
            print(leastCountSmallestDigit, end='')
        print(leastCountSmallestDigit)
        
main()
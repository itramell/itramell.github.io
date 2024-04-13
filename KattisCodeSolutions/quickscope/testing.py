# Author: Iona Tramelli
# Date: 3/04/24


def main():
    # Instantiations
    numberOfLines = int(input())
    currentLineNumber = 1
    codeBlockList = [set()] # Holds all the code blocks with their respective variable name
    variableTypeList = [dict()] # Holds all the variable types in dictionaries listed to match their respective code block
    codeBlockDepth = 0

    while currentLineNumber <= numberOfLines:
        currentLine = input().split()
        if currentLine[0] == "{":
            codeBlockList.append(set())
            variableTypeList.append(dict())
            codeBlockDepth += 1
        elif currentLine[0] == "DECLARE":
            if currentLine[1] in codeBlockList[codeBlockDepth]:
                print("MULTIPLE DECLARATION")
                return
            else:
                codeBlockList[codeBlockDepth].add(currentLine[1])
                variableTypeList[codeBlockDepth][currentLine[1]] = currentLine[2] # dict[variableName] = variableType
        elif currentLine[0] == "TYPEOF":
            for i in range (codeBlockDepth, -1, -1): # Check through all nested codeblocks
                if currentLine[1] in codeBlockList[i]:
                    print(variableTypeList[i][currentLine[1]]) # Print the variable type based on the variable name
                    break
                elif i == 0:
                    print("UNDECLARED")
        else:
            if codeBlockDepth == 0: # We have exited the code block and it is not nested
                codeBlockList = [set()]
                variableTypeList = [dict()]
            else: # We have exited a nested code block
                codeBlockList.pop()
                variableTypeList.pop()
                codeBlockDepth -= 1
        currentLineNumber += 1

    
main()
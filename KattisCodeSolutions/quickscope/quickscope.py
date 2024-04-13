# Author: Iona Tramelli
# Date: 3/04/24


def main():
    # Instantiations
    numberOfLines = int(input())
    currentLineNumber = 1
    codeBlockList = [set()] # Holds all the code blocks with their respective variable name
    variableTypeList = [dict()] # Holds all the variable types in dictionaries listed to match their respective code block
    variableLocations = dict() # Holds a list of code blocks that a variable is seen in, based on the variable name
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
                try:
                    variableLocations[currentLine[1]].append(codeBlockDepth)                    
                except:
                    variableLocations[currentLine[1]] = [codeBlockDepth]
        elif currentLine[0] == "TYPEOF":
            try:
                # Check for variable declaration, process based on answer
                if variableLocations[currentLine[1]] != []:
                    index = variableLocations[currentLine[1]][-1] # Index is the furthest code block in the variable has been seen
                    print(variableTypeList[index][currentLine[1]])
                else:
                    print("UNDECLARED")
            except:
                print("UNDECLARED")            
        else: # We have exited a nested code block
            for variable in codeBlockList[codeBlockDepth]: # Remove the depth from variables from the code block we are exiting from
                variableLocations[variable].pop()
            codeBlockList.pop()
            variableTypeList.pop()
            codeBlockDepth -= 1
        currentLineNumber += 1

    
main()
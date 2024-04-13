# Author: Iona Tramelli
# Date: 4/7/24


def main(): # Assumes a valid 3 x 3 board
    boards = int(input())
    for i in range(boards):
        totalX = 0
        totalO = 0
        winX = 0
        winO = 0
        columns = ["", "", ""]
        badCharacter = False
        # Go through all rows in a board and count X's and O's. Also check if one has won based on rows, and form the column strings.
        for j in range(3):
            row = input()
            if row == "XXX":
                winX += 1
            elif row == "OOO":
                winO += 1
            for k in range(3):
                if row[k] == "X":
                    totalX += 1
                    columns[k] += "X"
                elif row[k] == "O":
                    totalO += 1
                    columns[k] += "O"
                elif row[k] == ".":
                    columns[k] += "."
                else:
                    badCharacter = True
        if badCharacter:
            print("no")
            continue
        # Check if either X or O wins based on columns.
        for l in range(3):
            if columns[l] == "XXX":
                winX += 1
            elif columns[l] == "OOO":
                winO += 1
        # Checks for horizontal wins
        if columns[0][0] == "X" and columns[1][1] == "X" and columns[2][2] == "X":
            winX += 1
        elif columns[2][0] == "X" and columns[1][1] == "X" and columns[0][2] == "X":
            winX += 1
        elif columns[0][0] == "O" and columns[1][1] == "O" and columns[2][2] == "O":
            winO += 1
        elif columns[2][0] == "O" and columns[1][1] == "O" and columns[0][2] == "O":
            winO += 1
        # Check if O went first or too many O's
        if totalX < totalO or totalX - totalO >= 2: 
            print("no")
        # Check if X won but O made another move
        elif winX and totalX == totalO:
            print("no")
        # Check if both X and O won
        elif winO and winX:
            print("no")
        # Check if either X or O won more than once
        elif winX > 1 or winO > 1:
            print("no")
        # Valid board
        else:
            print("yes")
        try:
            input()
        except:
            break

main()
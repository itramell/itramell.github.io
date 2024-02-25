# Author: Iona Tramelli
# Date: 2/10/24

import re
from sys import stdin

def main():
    # read in all the lines as a list of strings and remove whitespace
    inputLines = [line.strip('\n  ') for line in stdin]

    # Combine all the lines to one string
    inputLines = "".join(inputLines)

    # Get all the endpoints
    allEndpoints = re.findall('\(\d+,\d+\)', inputLines)

    # Find figures and endpoint edge count
    currentEndpoint = 0
    firstEndpointInFigure = False
    secondEndpointInFigure = False
    figures = []
    endpointsAndEdges = {}
    while currentEndpoint <= (len(allEndpoints) - 2):
        # Loop to see if the first endpoint is in a figure already
        for figure in figures:
            if allEndpoints[currentEndpoint] in figure:
                firstEndpointFigure = figure
                firstEndpointInFigure = True
                # Increase endpoint edge count
                endpointsAndEdges[allEndpoints[currentEndpoint]] = endpointsAndEdges.get(allEndpoints[currentEndpoint]) + 1
                break
        # Loop to see if the second endpoint is in a figure already
        for figure in figures:
            if allEndpoints[currentEndpoint + 1] in figure:
                secondEndpointFigure = figure
                secondEndpointInFigure = True
                # Increase endpoint edge count
                endpointsAndEdges[allEndpoints[currentEndpoint + 1]] = endpointsAndEdges.get(allEndpoints[currentEndpoint + 1]) + 1
                break
        # Add endpoints or union sets based on previous figure - endpoint checks
        if not firstEndpointInFigure and not secondEndpointInFigure:
            figures.append({allEndpoints[currentEndpoint], allEndpoints[currentEndpoint + 1]})
            # Add new endpoint edge tracker
            endpointsAndEdges[allEndpoints[currentEndpoint]] = 1
            endpointsAndEdges[allEndpoints[currentEndpoint + 1]] = 1
        elif firstEndpointInFigure and not secondEndpointInFigure:
            firstEndpointFigure.add(allEndpoints[currentEndpoint + 1])
            # Add new endpoint edge tracker
            endpointsAndEdges[allEndpoints[currentEndpoint + 1]] = 1
        elif not firstEndpointInFigure and secondEndpointInFigure:
            secondEndpointFigure.add(allEndpoints[currentEndpoint])
            # Add new endpoint edge tracker
            endpointsAndEdges[allEndpoints[currentEndpoint]] = 1
        elif firstEndpointFigure != secondEndpointFigure:
            figures.append(firstEndpointFigure.union(secondEndpointFigure))
            figures.remove(firstEndpointFigure)
            figures.remove(secondEndpointFigure)

        currentEndpoint += 2
        firstEndpointInFigure = False
        secondEndpointInFigure = False

    # Find number of figures that are polygons
    polygonCount = 0
    for figure in figures:
        isPolygon = True
        for endpoint in figure:
            if endpointsAndEdges[endpoint] != 2:
                isPolygon = False
                break
        if isPolygon:
            polygonCount += 1

    print(str(len(figures)) + " " + str(polygonCount))


main()
export const markdown = `
# Organizing Media Components

<!-- TOC -->
- [Problem](#problem)
- [Matrix of Functionality](#matrix-of-functionality)
- [Criteria for Success](#criteria-for-success)
- [Component Design](#component-design)
- [Example: Zoom](#example-zoom)
- [Expanding: Media Playback](#expanding-media-playback)
- [Contexts](#contexts)
- [Example: Reseting tool state](#example-reseting-tool-state)
- [Performance?](#performance)
<!-- /TOC -->

## Problem

* Clarifai intends to support many of kinds of media, and each of those media
can have many different tools/visualizations. This leads to O(n^2)
complexity when we think of the interactions between the tools and the media
themselves.

* In portal, just with images and video, and bounding boxes and concepts,
we started seeing problems with interactions between functionalities,
tools, components, requests. This will only compound the complexity as we add more
functionality to the platform.

## Matrix of Functionality

| Media | Concept | Bounding Box | Polygon | Mask | Span/Token | Track | TimeSeries | Text/OCR  |
|-------|---------|--------------|---------|------|------------|-------|------------|-----------|
| Image |   ✔️    |       ✔️     |  ✔️    |  ✔️  |            |       |           |    ✔️     |
| Video |   ✔️    |       ✔️     |  ✔️    |  ✔️  |            |  ✔️  |  ✔️        |    ✔️    |
| Text  |   ✔️    |              |         |      |   ✔️      |       |            |           |
| Audio |   ✔️    |              |         |      |            |       |  ✔️       |    ✔️     |

## Criteria for Success

* Easily make changes to a single tool.
* Easily make changes to a specific media type.
* Easily create a new tool for 1 or more media types.
* Easily create a new media type and add existing tools.

## Component Design

* Use context to store tool state.
* The children are responsible for showing/hiding themselves as needed.
* Custom provider components are able to reset context when media changes.

## Example: Zoom

* We create a context to store the zoom state (0-1, for example) and
any callbacks needed to manipulate it (update, reset, etc).

* The media component as well as the tool's UI are able to
read/write from/to the zoom state.`;


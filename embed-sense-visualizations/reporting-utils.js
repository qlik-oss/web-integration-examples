// Download the visualization using the Capability APIs - Visualization API
// https://help.qlik.com/en-US/sense-developer/August2022/Subsystems/APIs/Content/Sense_ClientAPIs/CapabilityAPIs/VisualizationAPI/QVisualization.htm
export const downloadVisualization = (vis, type, width = 500, height = 400) => {
  switch (type) {
    case 'image': {
      const settings = {
        format: 'png',
        width,
        height,
      };
      return vis.exportImg(settings);
    }
    case 'pdf': {
      const settings = {
        documentSize: 'a4',
        aspectRatio: 0,
        orientation: 'landscape',
        objectSize: { width, height },
      };
      return vis.exportPdf(settings);
    }
  }
};

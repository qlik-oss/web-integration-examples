import fileSaver from 'file-saver';
import comm from './comm';

/**
 * Download the visualization using the Capability APIs - Visualization API
 * https://help.qlik.com/en-US/sense-developer/August2022/Subsystems/APIs/Content/Sense_ClientAPIs/CapabilityAPIs/VisualizationAPI/QVisualization.htm
 *
 * @param visualization
 * @param type, can be one of [pdf, image]
 * @param width output width in pixels, default 500
 * @param height output height in pixels, default 400
 * @returns {Promise<void>}
 */
export const downloadVisualization = (visualization, type, width = 500, height = 400) => {
  const exportError = () => alert(`Something went wrong, look at the browser console for error details`);
  switch (type) {
    case 'image': {
      const settings = {
        format: 'png',
        width,
        height,
      };
      return visualization.exportImg(settings).then((result) => {
        console.log(`The image is available at url ${result}`);
        downloadFile(result, visualization.id, 'png');
      }, exportError);
    }
    case 'pdf': {
      const settings = {
        documentSize: 'a4',
        aspectRatio: 0,
        orientation: 'landscape',
        objectSize: { width, height },
      };
      return visualization.exportPdf(settings).then((result) => {
        console.log(`The PDF is available at url ${result}`);
        downloadFile(result, visualization.id, 'pdf');
      }, exportError);
    }
  }
};

const downloadFile = (url, fileName, fileType) => {
  comm.getFileContent(url).then(
    (blob) => {
      const name = fileName ? `${fileName}.${fileType}` : undefined;
      fileSaver.saveAs(blob, name);
    },
    (err) => {
      alert(`Error saving the file: ${err}`);
    }
  );
};

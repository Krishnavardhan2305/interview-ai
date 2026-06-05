import PDFParser from "pdf2json";

export const extractPdfText = (buffer) => {
    return new Promise((resolve, reject) => {
        const pdfParser = new PDFParser();

        pdfParser.on("pdfParser_dataError", (err) => {
            reject(err);
        });

        pdfParser.on("pdfParser_dataReady", (pdfData) => {
            let text = "";

            pdfData.Pages.forEach((page) => {
                page.Texts.forEach((textItem) => {
                    textItem.R.forEach((run) => {
                        if (run.T) {
                            try {
                                text += decodeURIComponent(run.T) + " ";
                            } catch {
                                text += String(run.T) + " ";
                            }
                        }
                    });
                });

                text += "\n";
            });

            resolve(text);
        });

        pdfParser.parseBuffer(buffer);
    });
};
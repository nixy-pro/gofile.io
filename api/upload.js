import formidable from "formidable";
import fs from "fs";
import FormData from "form-data";
import fetch from "node-fetch";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: "Upload gagal" });

    const file = files.file;
    const stream = fs.createReadStream(file.filepath);
    const uploadForm = new FormData();
    uploadForm.append("file", stream, file.originalFilename);

    const gofileRes = await fetch("https://store1.gofile.io/uploadFile", {
      method: "POST",
      headers: {
        Authorization: process.env.fkquI3coDZlGCfeQbpvPKUUyWqupchIt,
      },
      body: uploadForm,
    });

    const result = await gofileRes.json();
    res.status(200).json(result.data);
  });
}

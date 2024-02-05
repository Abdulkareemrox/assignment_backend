const userRoutes = (app, fs) => {
  const projectPath = "./data/project.json";

  // helper methods
  const readFile = (
    callback,
    returnJson = false,
    filePath = projectPath,
    encoding = "utf8"
  ) => {
    fs.readFile(filePath, encoding, (err, data) => {
      if (err) {
        throw err;
      }

      callback(returnJson ? JSON.parse(data) : data);
    });
  };

  const writeFile = (
    fileData,
    callback,
    filePath = projectPath,
    encoding = "utf8"
  ) => {
    fs.writeFile(filePath, fileData, encoding, (err) => {
      if (err) {
        throw err;
      }

      callback();
    });
  };

  // READ
  app.get("/project", (req, res) => {
    fs.readFile(projectPath, "utf8", (err, data) => {
      if (err) {
        throw err;
      }

      res.send(JSON.parse(data));
    });
  });

  // CREATE
  app.post("/project", (req, res) => {
    readFile(
      (data) => {
        const newItem = req.body;

        if (!data.hasOwnProperty("data")) {
          data.data = [];
        }

        data.data.push(newItem);

        writeFile(
          JSON.stringify(data, null, 2),
          () => {
            res.status(200).send("new Project added");
          },
          projectPath
        );
      },
      true,
      projectPath
    );
  });

  app.post("/generateContent", (req, res) => {
    const { language, project_name, url } = req.body;

    const content = [
      {
        social_media: "google",
        headline: `Print Stylish T-Shirts Online With ${project_name}`,
        project: project_name,
        description:
          "Upgrade your wardrobe with our latest collection of comfortable and trendy T-shirts",
      },
      {
        social_media: "Facebook",
        headline: `Transform Your Brand with ${project_name}`,
        project: project_name,
        description: `Elevate your brand with ${project_name}, The leading online printing service for business, entrepreneurs, and individuals. From business cards to Personalized gifts, we deliver high-quality solutions with excellence and innovation. #${project_name} #CustomPrinting`,
        url: url,
        img_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg'
      },
      {
        social_media: "Twitter",
        headline: `Transform Your Brand with ${project_name}`,
        project: project_name,
        description: `Elevate your brand with ${project_name}, The leading online printing service for business, entrepreneurs, and individuals. From business cards to Personalized gifts, we deliver high-quality solutions with excellence and innovation. #${project_name} #CustomPrinting`,
        url: url,
        img_url: 'https://upload.wikimedia.org/wikipedia/commons/7/74/When_a_cat_poses.JPG'
      },
      {
        social_media: "bing",
        headline: `Print Stylish T-Shirts Online With ${project_name}`,
        project: project_name,
        description:
          "Upgrade your wardrobe with our latest collection of comfortable and trendy T-shirts",
      },
    ];

    res.status(200).json(content);
  });
};

module.exports = userRoutes;

exports.handler = async (event) => {

  const response = {
      results: [
      {
          id: "harry-potter",
          title: "Harry Potter",
          properties: {
              background: "url(./resourses/harry-potter.jpg)"
          }
      },
      {
          id: "star-wars-death-star",
          title: "Star Wars: All About The Death Star",
          properties: {
              background: "url(./resourses/star-wars.jpg)"
          }
      },
      {
          id: "jethods",
          title: "Refresh you knowledges about JS Methods",
          properties: {
              background: "url(./resourses/white-pink-blue.jpg)"
          }
      }
  ] 
  };
  return response;
};
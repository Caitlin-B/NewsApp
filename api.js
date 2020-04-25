import axios from "axios";

exports.getArticles = (q, datefrom, dateto, page) => {
  return axios
    .get(
      "https://content.guardianapis.com/search?api-key=f8cc9f8d-358d-409f-b365-ed41c01932ba",
      { params: { q: 'banana', page, "from-date": "2019-12-17", "to-date": "2020-01-17" } }
    )
    .then(res => res.data.response);
};

// exports.getArticles = (q, datefrom, dateto, page) => {
//   return axios
//     .get(
//       "https://content.guardianapis.com/search?api-key=f8cc9f8d-358d-409f-b365-ed41c01932ba",
//       { params: { q, page, "from-date": datefrom, "to-date": dateto } }
//     )
//     .then(res => res.data.response);
// };

import axios from "axios";

// 把 与服务器 通信的功能单独封装
const baseUrl = "http://localhost:3001/notes";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((respnse) => respnse.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((respnse) => respnse.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((respnse) => respnse.data);
};

// 模块导出一个对象（字典） 包含三个函数
// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update };

// 当对象的 key 和 变量名 一样时，可以简写为 { name, age }
// const person = {
//   name: name,
//   age: age
// }

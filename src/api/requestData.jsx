import Requset from "./httpMgr";
export function catMetaData(url) {
  return Requset({
    method: "get",
    url: url,
  });
}
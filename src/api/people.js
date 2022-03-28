import request from "@/plugins/axios";

// 获取人物详情
export function getPeopleNews(year) {
  return request("warTime", "get", { year });
}

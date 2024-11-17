import axios from "axios";

// const host ='http://10.10.10.225:8080/api/product';
const host ='http://localhost:8080/api/product';

// const header = {
//     headers: {
//         'Content-Type': 'multipart/form-data', // 파일 전송 형식 지정
//     }
// }

export const getList = async (page: number) => {
  
  try {
    const res = await axios.get(`${host}/list?page=${page}`);
    console.log('API Response for getList:', res.data); // 전체 응답을 콘솔에 출력
    console.log('DTO List:', res.data.dtoList); // dtoList 부분만 콘솔에 출력
    return res.data.dtoList;
  } catch (error) {
    console.error('Error fetching product list:', error);
  }

};

export const getOne = async (pno: number) => {

  const res = await axios.get(`${host}/read/${pno}`)

  return res.data

}

// 상품 수정 API
export const updateProduct = async (product: any) => {
  const res = await axios.put(`${host}/update`, product);
  return res.data;
};

// 상품 삭제 API
export const deleteProduct = async (pno: number) => {
  const res = await axios.delete(`${host}/delete/${pno}`);
  return res.data;
};

// api/categoryAPI.ts
export const getCategories = async () => {
  try {
    const url = `${host}/list/categories`;
    console.log('Request URL:', url);  // URL 확인
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error('카테고리 데이터를 불러오는 데 실패했습니다');
  }
};



export const getSubCategories = async (cno: number) => {
  try {
    const response = await fetch(`${host}/list/subcategory`); // 하위 카테고리 API 엔드포인트
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('하위 카테고리 로드 실패', error);
  }
};

export const postAdd = async (formData: FormData) => {
  try {
    const res = await axios.post(`${host}/add`, formData);
    console.log(res.data)
    return res.data;
  } catch (error) {
    console.error('Failed to add product:', error);
    throw error;
  }
};


export const response = {
    200: { stauts: 200, code: "0000", message: "success", description: "성공"},
    201: { stauts: 201, code: "0000", message: "Created", description: "성공(신규)"},
    204: { stauts: 204, code: "0000", message: "No Content", description: "성공(응답 내용 없음)"},
    401: { stauts: 401, code: "1401", message: "Unauthorized", description: "권한없음(인증되지 않음)"},
    403: { stauts: 403, code: "1403", message: "Forbidden", description: "리소스 접근 권한 없음."},
    403_2: { stauts: 403, code: "2403", message: "Forbidden", description: "리소스 접근 권한 없음(Timeout)"},
    404: { stauts: 404, code: "1404", message: "Not Found", description: "Resource Not found"},
    400: { stauts: 400, code: "1400", message: "Bad Request", description: "Bad Request"},
    500: { stauts: 500, code: "1500", message: "Error Message", description: "Internal Server Error"},
}

// export interface responseApi {
//     status: number;
//     code: string;
//     message: string;
//     description: string;
//     data: string[];
// }
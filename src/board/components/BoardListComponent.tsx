import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
// @ts-ignore
import { IBoard, getBoardList } from '../../api/boardAPI'; // 게시글 API 및 타입 임포트

function BoardListComponent() {
  const [boardList, setBoardList] = useState<IBoard[]>([]); // 게시글 리스트 상태
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태

  // 게시글 리스트를 불러오는 함수
  const fetchBoardList = async () => {
    try {
      const data = await getBoardList();
      console.log('Fetched board list:', data); // 데이터가 제대로 불러와지는지 확인용
      setBoardList(data);
      setLoading(false); // 데이터 로딩 완료 시 로딩 상태 해제
    } catch (error) {
      console.error('게시글 리스트 불러오기 오류:', error);
      setLoading(false);
    }
  };

  // 컴포넌트가 마운트될 때 게시글 리스트 불러오기
  useEffect(() => {
    fetchBoardList();
  }, []);

  return (
    <Card>
      {/* 헤더 */}
      <CardHeader
        title="게시글 목록"
        action={
          <Box width={150}>
            {/* 필요에 따라 여기에 추가 작업 버튼 등을 넣을 수 있음 */}
          </Box>
        }
      />

      {/* 카드와 테이블의 구분선 */}
      <Divider />

      {/* 테이블을 담는 컨테이너 */}
      <TableContainer>
        <Table>
          {/* 테이블 헤더 */}
          <TableHead style={{ backgroundColor: '#FCFBF0' }}>
            <TableRow>
              <TableCell align="center">No.</TableCell>
              <TableCell align="center">제목</TableCell>
              <TableCell align="center">작성자</TableCell>
              <TableCell align="center">작성일</TableCell>
              <TableCell align="center">조회수</TableCell>
            </TableRow>
          </TableHead>

          {/* 테이블 바디 */}
          <TableBody>
            {!loading && boardList.length > 0 ? (
              boardList.map((board) => (
                <TableRow
                  hover
                  key={board.bno}
                  onClick={() => console.log(`게시글 클릭: ${board.bno}`)} // 클릭 시 동작
                >
                  {/* 게시글 번호 */}
                  <TableCell align="center">{board.bno}</TableCell>

                  {/* 게시글 제목 */}
                  <TableCell align="left" style={{ width: '450px' }}>
                    <Typography variant="body1" fontWeight="bold" noWrap>
                      {board.title}
                    </Typography>
                  </TableCell>

                  {/* 작성자 */}
                  <TableCell align="center">{board.writer}</TableCell> {/* 수정된 부분 */}

                  {/* 작성일 */}
                  <TableCell align="center">
                    {new Date(board.createdDate).toLocaleDateString()}
                  </TableCell>

                  {/* 조회수 */}
                  <TableCell align="center">{board.viewCount}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  {loading ? '불러오는 중...' : '게시글이 없습니다.'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}

export default BoardListComponent;

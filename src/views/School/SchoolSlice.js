import {
  createSlice,
  createAsyncThunk,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { status } from "utils/helpers";
import axios from "axios";
import { SCHOOL_ENDPOINT, SUBJECT_ENDPOINT, QUIZ_ENDPOINT, GET_USER_EMAIL_ENDPOINT, TEACHER_ENDPOINT } from "utils/endpoints";

const initialState_School = {
  SchoolQuizList: {
    error: null,
    QuizList: {},
  },
  SchoolSubjectList: {
    error: null,
    SubjectList: [],
  },
  SchoolTeacherList: {
    error: null,
    TeacherList: {},
  },
  UserDetail:{
    data: {},
    role: {},
    status: 'idle',
  },
  QuestionDetail:{
    data:{},
    status: status.idle,
    Answers : [],
  },

};

//GET

export const getQuizList = createAsyncThunk("school/getQuizList", async ({id}) => {
  const Quiz = await axios.get(SCHOOL_ENDPOINT + '/' + id + "/quizzes");
  return Quiz;
});

export const getSubjectsList = createAsyncThunk(
  "school/getSubjectsList",
  async ({id}) => {
    const Subject = await axios.get(SCHOOL_ENDPOINT + '/' + id + "/subjects");
    return Subject.data;
  }
);

export const getUserEmail = createAsyncThunk(
  "school/getUserEmail",
  async ({Id, email}) => {
    const User_Email_response = await axios.get(GET_USER_EMAIL_ENDPOINT + Id + '?email=' + email);
    return User_Email_response.data ;
  }
);

export const getTeachersSchool = createAsyncThunk(
  "school/getTeachersSchool",
  async ({SchoolId}) => {
    const teacherResponse = await axios.get(TEACHER_ENDPOINT + 'school/'+ SchoolId);
    return teacherResponse.data ;
  }
);

// export const getSubjectsDetail = createAsyncThunk(
//   "School/GetSubjectsDetail",
//   async (payload) => {
//     const Subject = await axios.get(SUBJECT_ENDPOINT + '/' + payload);
//     return Subject;
//   }
// );

//POST

export const createSubject = createAsyncThunk(
  "school/createSubject",
  async ({SchoolId}) => {
    const Subject_response = await axios.post(SUBJECT_ENDPOINT, SchoolId);
    const { subject } = Subject_response;
    return subject;
  }
);

export const postUserToTeacher = createAsyncThunk(
  "school/postUserToTeacher",
  async ({QuizId, UserId}) => {
    const User_Email_response = await axios.post(TEACHER_ENDPOINT, {QuizId , UserId});
    return User_Email_response.data ;
  }
);

//DELETE

export const delateSubject = createAsyncThunk(
  "school/delateSubject",
  async (payload) => {
    const delete_response = await axios.delete(SUBJECT_ENDPOINT + "/" + payload);
    return delete_response.data;
  }
);

export const delateQuiz = createAsyncThunk(
  "school/delateQuiz",
  async (payload) => {
    const delete_response = await axios.delete(QUIZ_ENDPOINT + "/" + payload);
    return delete_response.data;
  }
);

export const removeTeacher = createAsyncThunk(
  "school/removeTeacher",
  async ({QuizId , UserId}) => {
    const delete_response = await axios.delete(TEACHER_ENDPOINT + '?UserId=' + UserId + '&&QuizId=' + QuizId);
    return delete_response.data;
  }
);

//PUT

export const editSubject = createAsyncThunk(
  "school/editSubject",
  async (payload) => {
    const Subject_response = await axios.put(
      SUBJECT_ENDPOINT + "/" + payload.id,
      payload
    );
    return Subject_response.data;
  }
);

const isPendingAction = isPending(
  getQuizList,
  getSubjectsList,
  createSubject,
  delateSubject,
  delateQuiz,
  editSubject,
  getTeachersSchool
);

const isRejectedAction = isRejected(
  getQuizList,
  getSubjectsList,
  createSubject,
  delateSubject,
  delateQuiz,
  editSubject,
  getTeachersSchool,
);

const isPendingActionDetail = isPending(
  getUserEmail,
  postUserToTeacher,
  removeTeacher,
);

const isRejectedActionDetail = isRejected(
  getUserEmail,
  postUserToTeacher,
  removeTeacher,
);

const SchoolSlice = createSlice({
  name: "school",
  initialState: initialState_School,
  reducers: {
    cleanUser: (state, { payload }) => {
      state.UserDetail.status = status.idle;
      state.UserDetail.data = {}
    },
    setQuestionDetail: (state,{payload}) =>{
      state.QuestionDetail.data = payload;
      payload.Answers  ? state.QuestionDetail.Answers = payload.Answers : state.QuestionDetail.Answers =[];
     state.QuestionDetail.status = status.pending 
      state.QuestionDetail.status = status.success
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getQuizList.fulfilled, (state, { payload }) => {
      state.status = status.success;
      state.SchoolQuizList.QuizList = payload.data.quizzes.byId;
    });
    builder.addCase(getSubjectsList.fulfilled, (state, { payload }) => {
      state.status = status.success;
      state.SchoolSubjectList.SubjectList = payload;
    });
    builder.addCase(getUserEmail.fulfilled, (state, { payload }) => {
      state.UserDetail.role = payload.role
      state.UserDetail.data = payload.user;  
      state.UserDetail.status = status.success;
    });
    builder.addCase(getTeachersSchool.fulfilled, (state, { payload }) => {
      state.SchoolTeacherList = payload;  
      state.status = status.success;
    });
    builder.addCase(createSubject.fulfilled, (state, { payload }) => {
      state.status = status.success;
    });
    builder.addCase(postUserToTeacher.fulfilled, (state, { payload }) => {
      state.UserDetail.status = status.success;
      state.UserDetail.role = payload.role
    });
    builder.addCase(delateSubject.fulfilled, (state, { payload }) => {
      state.status = status.success;
      state.SchoolSubjectList.SubjectList = state.SchoolSubjectList.SubjectList.filter(
        (subject) => {
          return subject.id !== payload.id;
        }
      );
    });
    builder.addCase(delateQuiz.fulfilled, (state, { payload }) => {
      state.status = status.success;
      state.SchoolQuizList.QuizList = state.SchoolQuizList.QuizList.filter(
        (quiz) => {
          return quiz.id !== payload.id;
        }
      );
    });
    builder.addCase(removeTeacher.fulfilled, (state, { payload }) => {
      state.UserDetail.status = status.idle;
      state.UserDetail.data = {}
      state.UserDetail.role = {}
    });
    builder.addCase(editSubject.fulfilled, (state, { payload }) => {
      state.status = status.success;
    });

    ////////////

    builder.addMatcher(isPendingAction, (state, { payload }) => {
      state.status = status.pending;
    });
    builder.addMatcher(isRejectedAction, (state, { payload }) => {
      state.status = status.error;
      state.error = payload;
    });
    builder.addMatcher(isPendingActionDetail, (state, { payload }) => {
      state.UserDetail.status = status.pending;
    });
    builder.addMatcher(isRejectedActionDetail, (state, { payload }) => {
      state.UserDetail.status = status.error;
      state.UserDetail.data = payload
    });
  },
});

export const { cleanUser, setQuestionDetail  } = SchoolSlice.actions

export default SchoolSlice;
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { QUESTIONS_ENDPOINT } from 'utils/endpoints';
import { QUIZ_ENDPOINT, ANSWERS_ENDPOINT } from 'utils/endpoints';
import { status } from 'utils/helpers';


export const CreateQuiz = createAsyncThunk(
    'Quiz/CreateQuiz',
    async (payload) => {
      payload.teachers = [1];
      payload.SchoolId = 1;
      const QuizCreate_response = await axios.post(QUIZ_ENDPOINT, payload);
      const { quiz, token } = QuizCreate_response;
      return quiz;
    }
  );

  export const CreateQuestion = createAsyncThunk(
    'Quiz/CreateQuestion',
    async (payload) => {

      payload.modifiedBy = 1;
      payload.createdBy = 1;
      const QuestionCreate_response = await axios.post(QUESTIONS_ENDPOINT, payload);
      const { quiz, token } = QuestionCreate_response;
      return quiz;
    }
  );

  export const UpdateQuestion = createAsyncThunk(
    'Quiz/UpdateQuestion',
    async (payload) => {

      payload.modifiedBy = 1;
      payload.createdBy = 1;
      const UpdateQuestion_response = await axios.put(QUESTIONS_ENDPOINT +'/' + payload.id, payload);
      // const { quiz, token } = UpdateQuestion_response;
      return UpdateQuestion_response.data;
    }
  );

  export const getAllQuestions = createAsyncThunk(
    'Quiz/getAllQuestions',
    async (payload) => {
      const Questions_response = await axios.get(QUIZ_ENDPOINT +'/'+ payload );
      return Questions_response.data.questions.byId;
    }
  );

  export const UpdateAnswers = createAsyncThunk(
    'Quiz/UpdateAnswers',
    async (payload) => {
      console.log('ESTO LE MANDO', payload)
      const UpdateAnswers_response = await axios.put(ANSWERS_ENDPOINT+ '/' + payload.id , payload );
      return UpdateAnswers_response.data
    }
  );

  export const DeleteAnswers = createAsyncThunk(
    'Quiz/DeleteAnswers',
    async (id) => {
      console.log('ESTO LE MANDO', id)
      const DeleteAnswers_response = await axios.delete(ANSWERS_ENDPOINT + '/' + id);
      return DeleteAnswers_response.data
    }
  );

  export const CreateAnswers = createAsyncThunk(
    'Quiz/CreateAnswers',
    async (payload) => {
      const CreateAnswers_response = await axios.post(ANSWERS_ENDPOINT ,payload);
      return CreateAnswers_response.data
    }
  );
  export const deleteQuestion = createAsyncThunk(
    'Quiz/deleteQuestion',
    async (payload) => {
      const Questions_response = await axios.delete(QUESTIONS_ENDPOINT +'/'+ payload );
      return Questions_response.data;
    }
  );

const initialState_QuizLoader = {
  Quiz: {},
  status: status.idle,
  materiaStatus: status.idle,
  questions:[],
  error:''
};

const QuizLoaderSlice = createSlice({
  name: 'Quiz',
  initialState: initialState_QuizLoader,
  reducers: {
  },
  extraReducers: {
    [CreateQuiz.pending]: (state, {payload  }) => {
      state.status = status.pending;
    },
    [CreateQuiz.fulfilled]: (state, { payload }) => {
      state.status = status.success;
    },
    [CreateQuiz.rejected]: (state, { payload }) => {
      state.status = status.error;
      state.error = payload;
    },
    [CreateQuestion.pending]: (state, {payload  }) => {
      state.status = status.pending;
    },
    [CreateQuestion.fulfilled]: (state, { payload }) => {
      state.status = status.success;
    },
    [CreateQuestion.rejected]: (state, { payload }) => {
      state.status = status.error;
      state.error = payload;
    },
    [getAllQuestions.pending]: (state, {payload  }) => {
      state.status = status.pending;
    },
    [getAllQuestions.fulfilled]: (state, { payload }) => {
      state.status = status.success;
      state.questions = payload;
    },
    [getAllQuestions.rejected]: (state, { payload }) => {
      state.status = status.error;
      state.error = payload;
    },
    [deleteQuestion.pending]: (state, {payload  }) => {
      state.status = status.pending;
    },
    [deleteQuestion.fulfilled]: (state, { payload }) => {
      state.status = status.success;
    },
    [deleteQuestion.rejected]: (state, { payload }) => {
      state.status = status.error;
      state.error = payload;
    },
    [UpdateQuestion.pending]: (state, {payload  }) => {
      state.status = status.pending;
    },
    [UpdateQuestion.fulfilled]: (state, { payload }) => {
      state.status = status.success;
    },
    [UpdateQuestion.rejected]: (state, { payload }) => {
      state.status = status.error;
      state.error = payload;
    },
    [UpdateAnswers.pending]: (state, {payload  }) => {
      state.status = status.pending;
    },
    [UpdateAnswers.fulfilled]: (state, { payload }) => {
      state.status = status.success;
    },
    [UpdateAnswers.rejected]: (state, { payload }) => {
      state.status = status.error;
      state.error = payload;
    },
    [DeleteAnswers.pending]: (state, {payload  }) => {
      state.status = status.pending;
    },
    [DeleteAnswers.fulfilled]: (state, { payload }) => {
      state.status = status.success;
    },
    [DeleteAnswers.rejected]: (state, { payload }) => {
      state.status = status.error;
      state.error = payload;
    },
    [CreateAnswers.pending]: (state, {payload  }) => {
      state.status = status.pending;
    },
    [CreateAnswers.fulfilled]: (state, { payload }) => {
      state.status = status.success;
    },
    [CreateAnswers.rejected]: (state, { payload }) => {
      state.status = status.error;
      state.error = payload;
    },
  },
});


export default QuizLoaderSlice;

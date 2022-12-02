import * as yup from "yup";

const addFormSchema = yup.object({
  companyName: yup.string().required("*Company name required."),
  jobTitle: yup.string().required("*Job title required."),
  type: yup.string().required("*Job type required."),
  location: yup.string().required("*Location required."),
  duration: yup.string().required("*Duration required."),
  startDate: yup.string().required("*Start date required."),
  expectedSalary: yup.string().required("*Expected Salary required."),
  portalLink: yup.string().required("*Portal Link required."),
  jobDescription: yup.string(),
  experience: yup.string(),
  batch : yup.string()
});

export default addFormSchema;

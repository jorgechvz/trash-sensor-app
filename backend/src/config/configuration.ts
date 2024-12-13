export default () => ({
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
  port: parseInt(process.env.PORT, 10) || 3000,
});

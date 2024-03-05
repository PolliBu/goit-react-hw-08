import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/auth/operations';
import css from './LoginForm.module.css';
import Button from '@mui/material/Button';

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    dispatch(
      logIn({
        email: form.elements.email.value,
        password: form.elements.password.value,
      }),
    )
      .unwrap()
      .then(() => {
        toast.success('login success');
      })
      .catch(() => {
        toast.error('login error');
      });
    form.reset();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit} autoComplete="off">
      <label className={css.label}>
        Email
        <input type="email" name="email" />
      </label>
      <label className={css.label}>
        Password
        <input type="password" name="password" />
      </label>
      <Button variant="contained" className={css.btn} type="submit">
        Log In
      </Button>
    </form>
  );
};

export default LoginForm;

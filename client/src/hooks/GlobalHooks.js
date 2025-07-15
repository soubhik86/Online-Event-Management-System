import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const GlobalHooks = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return { queryClient, navigate };
};
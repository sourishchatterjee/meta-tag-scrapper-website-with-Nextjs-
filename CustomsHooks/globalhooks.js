import { useQueryClient } from "@tanstack/react-query";
// import { useDispatch } from "react-redux";

export const useGlobalHooks = () => {
  const queryClient = useQueryClient();
  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  return { queryClient };
};

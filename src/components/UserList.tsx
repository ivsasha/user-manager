import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUsers, createUser, updateUser } from '../api/user';
import { User, UserFormData } from '../types/user';
import {
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import UserModal from './UserModal';

const UserList: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: users = [], isLoading } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: newUser => {
      queryClient.setQueryData<User[]>(['users'], (old = []) => [
        ...old,
        { ...newUser, id: old.length + 1000 },
      ]);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, user }: { id: number; user: UserFormData }) =>
      updateUser(id, user),
    onSuccess: (updatedUser, variables) => {
      queryClient.setQueryData<User[]>(['users'], (old = []) =>
        old.map(u => (u.id === variables.id ? { ...u, ...variables.user } : u)),
      );
    },
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedUser, setSelectedUser] = useState<User | undefined>();

  const handleCreate = () => {
    setModalMode('create');
    setSelectedUser(undefined);
    setModalOpen(true);
  };

  const handleEdit = (user: User) => {
    setModalMode('edit');
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleSubmit = (data: UserFormData) => {
    if (modalMode === 'create') {
      createMutation.mutate(data);
    } else if (modalMode === 'edit' && selectedUser) {
      updateMutation.mutate({ id: selectedUser.id, user: data });
    }

    setModalOpen(false);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Button variant="contained" onClick={handleCreate} sx={{ mb: 2 }}>
        Create User
      </Button>
      <List>
        {users.map(user => (
          <ListItem key={user.id}>
            <ListItemText primary={user.name} secondary={user.email} />
            <IconButton edge="end" onClick={() => handleEdit(user)}>
              <EditIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>

      <UserModal
        open={modalOpen}
        mode={modalMode}
        initialData={selectedUser}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default UserList;

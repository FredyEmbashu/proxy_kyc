import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  TextField,
  Button,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Box,
} from '@mui/material';

const customerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  idNumber: z.string().regex(/^\d{11}$/, 'ID number must be 11 digits'),
  dateOfBirth: z.string(),
  gender: z.enum(['male', 'female', 'other']),
  nationality: z.string().min(2, 'Please select nationality'),
  phoneNumber: z.string().regex(/^\+264\d{9}$/, 'Phone number must be in format +264XXXXXXXXX'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  occupation: z.string().min(2, 'Occupation must be at least 2 characters'),
  employmentStatus: z.enum(['employed', 'self-employed', 'unemployed', 'student']),
  monthlyIncome: z.string().regex(/^\d+$/, 'Monthly income must be a number'),
});

type CustomerFormData = z.infer<typeof customerSchema>;

interface CustomerFormProps {
  onSubmit: (data: CustomerFormData) => void;
  initialData?: Partial<CustomerFormData>;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ onSubmit, initialData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: initialData,
  });

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Customer Information
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <TextField
              {...register('firstName')}
              label="First Name"
              sx={{ flex: 1, minWidth: '250px' }}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />

            <TextField
              {...register('lastName')}
              label="Last Name"
              sx={{ flex: 1, minWidth: '250px' }}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <TextField
              {...register('idNumber')}
              label="ID Number"
              sx={{ flex: 1, minWidth: '250px' }}
              error={!!errors.idNumber}
              helperText={errors.idNumber?.message}
            />

            <TextField
              {...register('dateOfBirth')}
              label="Date of Birth"
              type="date"
              sx={{ flex: 1, minWidth: '250px' }}
              InputLabelProps={{ shrink: true }}
              error={!!errors.dateOfBirth}
              helperText={errors.dateOfBirth?.message}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <FormControl sx={{ flex: 1, minWidth: '250px' }} error={!!errors.gender}>
              <InputLabel>Gender</InputLabel>
              <Select {...register('gender')} label="Gender">
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
              {errors.gender && (
                <FormHelperText>{errors.gender.message}</FormHelperText>
              )}
            </FormControl>

            <TextField
              {...register('nationality')}
              label="Nationality"
              sx={{ flex: 1, minWidth: '250px' }}
              error={!!errors.nationality}
              helperText={errors.nationality?.message}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <TextField
              {...register('phoneNumber')}
              label="Phone Number"
              placeholder="+264XXXXXXXXX"
              sx={{ flex: 1, minWidth: '250px' }}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
            />

            <TextField
              {...register('email')}
              label="Email"
              type="email"
              sx={{ flex: 1, minWidth: '250px' }}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Box>

          <TextField
            {...register('address')}
            label="Address"
            multiline
            rows={3}
            error={!!errors.address}
            helperText={errors.address?.message}
          />

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <TextField
              {...register('occupation')}
              label="Occupation"
              sx={{ flex: 1, minWidth: '250px' }}
              error={!!errors.occupation}
              helperText={errors.occupation?.message}
            />

            <FormControl sx={{ flex: 1, minWidth: '250px' }} error={!!errors.employmentStatus}>
              <InputLabel>Employment Status</InputLabel>
              <Select {...register('employmentStatus')} label="Employment Status">
                <MenuItem value="employed">Employed</MenuItem>
                <MenuItem value="self-employed">Self-employed</MenuItem>
                <MenuItem value="unemployed">Unemployed</MenuItem>
                <MenuItem value="student">Student</MenuItem>
              </Select>
              {errors.employmentStatus && (
                <FormHelperText>{errors.employmentStatus.message}</FormHelperText>
              )}
            </FormControl>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <TextField
              {...register('monthlyIncome')}
              label="Monthly Income (NAD)"
              type="number"
              sx={{ flex: 1, minWidth: '250px' }}
              error={!!errors.monthlyIncome}
              helperText={errors.monthlyIncome?.message}
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default CustomerForm;
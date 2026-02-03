import { ApiProperty } from '@nestjs/swagger';

export class TaskResponseDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Task ID',
  })
  id: string;

  @ApiProperty({
    example: 'Complete project documentation',
    description: 'Task title',
  })
  title: string;

  @ApiProperty({
    example: 'Write comprehensive API documentation',
    description: 'Task description',
    nullable: true,
  })
  content: string | null;

  @ApiProperty({ example: false, description: 'Task completion status' })
  completed: boolean;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'User ID who owns the task',
  })
  userId: string;

  @ApiProperty({
    example: '2026-02-03T15:30:00.000Z',
    description: 'Task creation timestamp',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2026-02-03T15:30:00.000Z',
    description: 'Task last update timestamp',
  })
  updatedAt: Date;
}

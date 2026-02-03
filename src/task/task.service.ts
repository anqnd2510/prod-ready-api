import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskResponseDto } from './dto/task-response.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(
    userId: string,
    createTaskDto: CreateTaskDto,
  ): Promise<TaskResponseDto> {
    const task = await this.prisma.task.create({
      data: {
        title: createTaskDto.title,
        content: createTaskDto.content,
        userId,
      },
    });

    return task;
  }

  async findAll(userId: string): Promise<TaskResponseDto[]> {
    const tasks = await this.prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return tasks;
  }

  async findOne(id: string, userId: string): Promise<TaskResponseDto> {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    if (task.userId !== userId) {
      throw new ForbiddenException('You can only access your own tasks');
    }

    return task;
  }

  async update(
    id: string,
    userId: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<TaskResponseDto> {
    // Check if task exists and belongs to user
    await this.findOne(id, userId);

    const updatedTask = await this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });

    return updatedTask;
  }

  async remove(id: string, userId: string): Promise<void> {
    // Check if task exists and belongs to user
    await this.findOne(id, userId);

    await this.prisma.task.delete({
      where: { id },
    });
  }
}

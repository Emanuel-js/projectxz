import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schema/task.schema';
import { Model } from 'mongoose';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModle: Model<Task>) {}

  create(createTaskDto: CreateTaskDto) {
    const created = new this.taskModle(createTaskDto);
    return created.save();
  }

  findAll() {
    return this.taskModle.find().exec();
  }

  findOne(id: string) {
    return this.taskModle.findById(id).exec();
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    return this.taskModle
      .findByIdAndUpdate(id, updateTaskDto, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.taskModle.findByIdAndDelete(id).exec();
  }
}

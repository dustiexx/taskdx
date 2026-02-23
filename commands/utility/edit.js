const {SlashCommandBuilder, MessageFlags} = require('discord.js');
const Task = require('../../models/task');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('edit')
    .setDescription('Edit a task')
    .addStringOption(option =>
        option
            .setName('id')
            .setDescription('task id')
            .setMaxLength(25)
            .setRequired(true)
        )
    .addStringOption(option =>
        option
            .setName('new_name')
            .setDescription('edit task name')
            .setMaxLength(30)
            .setRequired(false)
    )
    .addStringOption(option =>
        option
            .setName('set_new_description')
            .setDescription('edit task description')
            .setMaxLength(100)
            .setRequired(false)
        )
    .addStringOption(option =>
        option
            .setName('new_due_date')
            .setDescription('set new due date YYYY-MM-DD')
            .setRequired(false)
        ),
    async execute(interaction) {
        interaction.reply('Finding Task...');
        let taskid = interaction.options.getString('id');
        let task = await Task.findById(taskid);
        if (!task) {
            await interaction.editReply(`Task with id ${taskid} not found.`);
            return;
        }
        else {
            let new_name = interaction.options.getString('new_name') ?? task.name;
            let new_description = interaction.options.getString('set_new_description') ?? task.description;
            let new_due_date = interaction.options.getString('new_due_date') ?? task.dueDate;
            let newTask={
                name: new_name,
                description: new_description,
                dueDate: new_due_date
            }
            await Task.findByIdAndUpdate(taskid, newTask);
            await interaction.editReply(`Task with id ${taskid} has been updated.`);
        }

    }
};
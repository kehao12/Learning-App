namespace Learning.API.DTOs.Item
{
    public class ItemForAddDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int LessonId { get; set; }
        public int FileId { get; set; }
    }
}
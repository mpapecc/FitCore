using RazorEngineCore;

IRazorEngine razorEngine = new RazorEngine();
string templateText = "Hello @Model.Name and @Model.Items.First()";

// yeah, heavy definition
IRazorEngineCompiledTemplate<RazorEngineTemplateBase<TestModel>> template = razorEngine.Compile<RazorEngineTemplateBase<TestModel>>(templateText);

string result = template.Run(instance =>
{
    instance.Model = new TestModel()
    {
        Name = "Hello",
        Items = new[] { 3, 1, 2 }
    };
});

Console.WriteLine(result);

public class TestModel
{
    public string Name { get; set; }    
    public int[] Items { get; set; }
}

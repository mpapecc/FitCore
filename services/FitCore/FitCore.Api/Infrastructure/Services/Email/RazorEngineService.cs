using RazorEngineCore;
using System.Reflection;

namespace FitCore.Api.Infrastructure.Services.Email;

public class RazorEngineService
{
    private readonly IRazorEngine _razorEngine;
    private readonly string _layoutContent;
    private readonly Dictionary<string, string> _templateCache = new();

    public RazorEngineService()
    {
        _razorEngine = new RazorEngine();
        _layoutContent = LoadTemplateFromAssembly("_Layout");
    }

    public async Task<string> RenderAsync<TModel>(
        string templateName,
        TModel model)
    {
        // Step 1 — render the content template
        var templateContent = LoadTemplateFromAssembly(templateName);
        var compiled = await _razorEngine
            .CompileAsync<RazorEngineTemplateBase<TModel>>(templateContent);

        var body = await compiled.RunAsync(instance =>
        {
            instance.Model = model;
        });

        // Step 2 — inject body into layout using simple string replace
        return _layoutContent.Replace("{{BODY}}", body);
    }

    private string LoadTemplateFromAssembly(string templateName)
    {
        if (_templateCache.TryGetValue(templateName, out var cached))
            return cached;

        var assembly = Assembly.GetExecutingAssembly();
        var resourceName = assembly
            .GetManifestResourceNames()
            .FirstOrDefault(r => r.EndsWith($"{templateName}.cshtml"))
            ?? throw new FileNotFoundException(
                $"Email template '{templateName}.cshtml' not found. " +
                $"Available: {string.Join(", ", assembly.GetManifestResourceNames())}");

        using var stream = assembly.GetManifestResourceStream(resourceName)!;
        using var reader = new StreamReader(stream);
        var content = reader.ReadToEnd();

        _templateCache[templateName] = content;
        return content;
    }
}
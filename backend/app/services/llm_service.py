from app.services.llm import LLMFactory
from app.services.llm.base import BaseLLM

# Convenience entry point for the rest of the app
# Can be used as a singleton or factory wrapper

class LLMServiceWrapper:
    """
    High-level service that uses the factory to get the right provider.
    """
    def get_provider(self, provider_name: str = None) -> BaseLLM:
        return LLMFactory.get_llm(provider_name)

    async def generate_response(self, text: str, provider: str = None, **kwargs) -> str:
        llm = self.get_provider(provider)
        return await llm.generate(text, **kwargs)

llm_service = LLMServiceWrapper()
